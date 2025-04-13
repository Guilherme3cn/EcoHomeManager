import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f5e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  consumptionBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  consumptionLabel: {
    fontSize: 16,
    color: '#888',
  },
  consumptionValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C853',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  applianceList: {
    marginBottom: 20,
  },
  applianceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  applianceIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  applianceInfo: {
    flex: 1,
  },
  applianceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applianceConsumption: {
    color: '#666',
  },
  deleteText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#00C853',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  graphPlaceholder: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
  },
  graphText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  iconScroll: {
    marginBottom: 10,
  },
  iconOption: {
    marginRight: 10,
    borderRadius: 8,
    padding: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  selectedIcon: {
    backgroundColor: '#c8f7dc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: '#888',
  },
  confirmButton: {
    padding: 10,
  },
  confirmText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
});


export default styles;
