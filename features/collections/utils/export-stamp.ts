import { toPng } from "html-to-image";

export interface ExportStampOptions {
  filename?: string;
  pixelRatio?: number;
}

/**
 * Converts a DOM node into a PNG and triggers the appropriate share/download mechanism.
 */
export async function exportStampClient(
  node: HTMLElement,
  options: ExportStampOptions = {}
): Promise<void> {
  const { filename = "passivoo-artifact.png", pixelRatio = 2 } = options;

  try {
    // 1. Generate the PNG data URL
    const dataUrl = await toPng(node, {
      pixelRatio,
      cacheBust: true,
      skipFonts: false,
      style: {
        // Ensure transparent background if the node doesn't have one
        background: "transparent",
      },
    });

    // 2. Convert Data URL to a native File object for sharing
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: "image/png" });

    // 3. Attempt Native Mobile Web Share API
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          title: "My Passivoo Artifact",
          text: "Check out my latest collector's artifact on Passivoo!",
          files: [file],
        });
        return; // Success! Exit early.
      } catch (shareError: any) {
        // If the user simply closed the share sheet, abort without throwing an error
        if (shareError.name === "AbortError") {
          return;
        }
        console.warn("Native share failed or was rejected, falling back to download.", shareError);
      }
    }

    // 4. Fallback: Desktop / Unsupported Mobile Browser File Download
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("[EXPORT_STAMP_ERROR]: Failed to generate image.", error);
    throw new Error("Could not generate image. Please try again.");
  }
}