import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface ModalProps {
  childComponent: React.ReactNode;
  isModalOpen: boolean;
  handlerModalStatus: () => void;
}

const AppModal: React.FC<ModalProps> = ({
  childComponent,
  isModalOpen,
  handlerModalStatus,
}) => {
  return (
    <Portal>
      <Modal
        visible={isModalOpen}
        onDismiss={() => handlerModalStatus()}
        contentContainerStyle={style.modalContainer}
      >
        {childComponent}
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    width: '80%',
    height: '80%',
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.BLUE,
  },
});

export default AppModal;
