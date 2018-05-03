module Main exposing (main)

import Framework
import Navigation


main : Program Framework.Flag Framework.Model Framework.Msg
main =
    Navigation.programWithFlags Framework.MsgChangeLocation
        { init = Framework.init
        , view = Framework.view
        , update = Framework.update
        , subscriptions = \_ -> Sub.none
        }
