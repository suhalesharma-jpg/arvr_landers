# Application Workflow

## Execution Flow

1. User launches the application.
2. AR Session initializes.
3. Camera feed begins scanning environment.
4. System compares frames with reference image library.
5. When an image is detected:
   - Tracking state becomes active.
   - Corresponding monument data is retrieved.
   - AR overlay panel is displayed.
6. User reads or interacts with information.
7. User can close panel or scan another monument.

---

## Tracking States

- None → No image detected
- Limited → Partial detection
- Tracking → Full detection and content display

