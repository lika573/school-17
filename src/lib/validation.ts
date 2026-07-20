export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+995\s?)?[\d\s\-()]{9,}$/;

export function validateAdmissionForm(data: {
  parentName: string;
  childName: string;
  birthDate: string;
  grade: string;
  phone: string;
  email: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.parentName.trim()) {
    errors.parentName = "მშობლის სახელი სავალდებულოა";
  } else if (data.parentName.trim().length < 3) {
    errors.parentName = "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს";
  }

  if (!data.childName.trim()) {
    errors.childName = "ბავშვის სახელი სავალდებულოა";
  } else if (data.childName.trim().length < 3) {
    errors.childName = "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს";
  }

  if (!data.birthDate) {
    errors.birthDate = "დაბადების თარიღი სავალდებულოა";
  } else {
    const birth = new Date(data.birthDate);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    if (age < 5 || age > 18) {
      errors.birthDate = "ასაკი უნდა იყოს 5–18 წლის დიაპაზონში";
    }
  }

  if (!data.grade) {
    errors.grade = "კლასის არჩევა სავალდებულოა";
  }

  if (!data.phone.trim()) {
    errors.phone = "ტელეფონი სავალდებულოა";
  } else if (!phoneRegex.test(data.phone.trim())) {
    errors.phone = "შეიყვანეთ სწორი ტელეფონის ნომერი";
  }

  if (!data.email.trim()) {
    errors.email = "ელფოსტა სავალდებულოა";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "შეიყვანეთ სწორი ელფოსტის მისამართი";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "სახელი სავალდებულოა";
  }

  if (!data.email.trim()) {
    errors.email = "ელფოსტა სავალდებულოა";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "შეიყვანეთ სწორი ელფოსტის მისამართი";
  }

  if (!data.subject.trim()) {
    errors.subject = "თემა სავალდებულოა";
  }

  if (!data.message.trim()) {
    errors.message = "შეტყობინება სავალდებულოა";
  } else if (data.message.trim().length < 10) {
    errors.message = "შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
