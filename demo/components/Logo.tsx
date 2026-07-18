import { Text } from "../../common";
import { useSidebar } from "../../layout";

export const Logo: React.FC = () => {
  const { isOpen } = useSidebar();
  return isOpen ? (
    <Text as="h2" size="lg" weight="bold">
      mpComponents
    </Text>
  ) : (
    <Text as="h2" size="lg" weight="bold">
      mp
    </Text>
  );
};
