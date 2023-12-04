import { extendTheme } from "@chakra-ui/react";
import Input from './components/Input'
import { FormLabel } from "./components/form";
import Form from './components/formControl'
import colors from "./colors";
import Button from "./components/Button";

export default extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: colors,
  components: {
    Form,
    Input,
    FormLabel,
    Button
  }
})