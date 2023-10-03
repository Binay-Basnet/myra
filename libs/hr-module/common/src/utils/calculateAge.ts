export const calculateAge = (birthdate: Date) => {
  // Parse the birthdate string into a Date object
  const birthDate = new Date(birthdate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
};

export default calculateAge;
