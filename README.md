Reproduction of crashes using JSI libraries such as @shopify/react-native-skia with react-native-v8

Root of the problem appears to be invalid props passed to JSI methods. With hermes this results in an error message. With v8 it results in a deadlock or crash.

To reproduce this, set `frontWidth` prop on `TextWithBorderSkia` to `NaN`. On v8 this deadlocks or crashes. On hermes it results in an error message.
