module Main exposing (main)

import Framework
import Html


main : Program Never Framework.Model Framework.Msg
main =
    Html.program
        { init = Framework.init
        , view = Framework.view
        , update = Framework.update
        , subscriptions = \_ -> Sub.none
        }
