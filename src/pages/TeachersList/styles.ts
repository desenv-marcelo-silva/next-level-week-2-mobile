import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  teacherList: {
    marginTop: -30,
  },

  searchForm: {
    marginBottom: 4,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '46%',
  },

  input: {
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },

  submitButton: {
    backgroundColor: '#04d361',
    flexDirection: 'row',
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },
});

export default styles;
