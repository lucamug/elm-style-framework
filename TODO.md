* Fix button Sizes
* Create a Jumbo  button
* Overwrite the Primary

Work directly with hue, saturation, lightness

{ hue, saturation, lightness } =
   baseColor
       |> Color.toHsl

headingColor =
   Color.hsl hue saturation (lightness * 0.7)

detailsColor =
   Color.hsl hue (saturation * 0.8) (lightness * 0.5 + 0.3)

backgroundColor =
   Color.hsl hue (saturation * 1.2) (lightness * 0.05 + 0.93)
