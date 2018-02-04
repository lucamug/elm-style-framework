module Main exposing (main)

import Element exposing (..)
import Framework.Button as Button exposing (button)
import Framework.Modifiers exposing (..)


main =
    layout [] <|
        button [ Medium, Success, Outlined ] Nothing "Button"
