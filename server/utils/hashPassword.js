import bcrypt from 'bcrypt';

const hashingPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

export default hashingPassword;