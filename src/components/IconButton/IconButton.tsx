import { FC, useState } from "react";
import { LucideIcon } from "lucide-react-native";
import { GestureResponderEvent } from "react-native";

import { config } from "../../../gluestack-ui.config";
import { Icon, Pressable } from "../core";

type colours = keyof typeof config.theme.tokens.colors;

interface Props {
  icon: LucideIcon;
  color?: colours;
  onPress: (event: GestureResponderEvent) => void;
}

const IconButton: FC<Props> = ({ icon, color = "gray400", onPress }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      p="$1"
      onPress={onPress}
      borderRadius="$full"
      sx={{ ":active": { bg: "$primary400" } }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Icon as={icon} color={pressed ? "$white" : `$${color}`} />
    </Pressable>
  );
};

export { IconButton };
