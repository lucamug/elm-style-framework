module Main exposing (main)

import Element exposing (layout)
import Framework.Button as Button
import Framework.Modifier exposing (Modifier(..))
import Html


main : Html.Html a
main =
    layout [] <|
        Button.button [ Medium, Success, Outlined ] Nothing "Button"
