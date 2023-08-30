import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { FolderProps } from "@interfaces/bookmark";
import * as Haptics from "expo-haptics";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { UserFolderList } from "Folder";

interface Props extends UserFolderList {
  onOpen: (id: number) => void;
}

const FOLDER_ICON = [
  require("@assets/folders/light.png"),
  require("@assets/folders/yellow.png"),
  require("@assets/folders/gray.png"),
];

const Folder = ({ onOpen, folderId, title }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [COLOR, mode] = useThemeStyle();
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = ["폴더 수정", "폴더 삭제", "취소"];
    const cancelButtonIndex = 2;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.push("EditFolder", { id: folderId });
          case 1:
          case cancelButtonIndex:
          // 닫기
        }
      }
    );
  };

  return (
    <FolderWrapper
      onPress={() => onOpen(folderId)}
      onLongPress={openActionSheet}
    >
      {/* TODO : Icon 색상 기준 따라 반영 */}
      <AutoSizedImage source={FOLDER_ICON[1]} width={90} />
      <FolderInfo COLOR={COLOR}>{title}</FolderInfo>
    </FolderWrapper>
  );
};

const FolderWrapper = styled.TouchableOpacity`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7px;
`;

const FolderInfo = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

export default Folder;
