module Main exposing (main)

import Element exposing (..)
import Framework.Button as Button exposing (button)
import Framework.Modifier exposing (..)
import Html


main : Html.Html a
main =
    layout [] <|
        button [ Medium, Success, Outlined ] Nothing "Button"
