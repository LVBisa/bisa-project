import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateButton = ({ stack, eventId, onSetEventChange }) => {
  const navigation = useNavigation();

  function toCreate() {
    navigation.navigate(stack, {
      eventId: eventId,
      onSetEventChange: onSetEventChange,
    });
  }

  return (
    <TouchableOpacity onPress={toCreate}>
      <Image source={require("../../assets/images/plus-circle.png")} />
    </TouchableOpacity>
  );
};

export default CreateButton;
