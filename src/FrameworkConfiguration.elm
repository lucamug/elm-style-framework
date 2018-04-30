module FrameworkConfiguration exposing (confColor, confFloat, confString)

import Color
import Dict


confFloat : Dict.Dict String Float
confFloat =
    Dict.fromList
        []


confColor : Dict.Dict String Color.Color
confColor =
    Dict.fromList
        []


confString : Dict.Dict String String
confString =
    Dict.fromList
        []
