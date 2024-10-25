import { Box, Text } from '@radix-ui/themes';

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, id, type = 'text', placeholder, value, onChange }: InputFieldProps) {
  return (
    <>
      <Text as="label" weight="medium" htmlFor={id}>
        {label}
      </Text>
      <Box mt="2">
        <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      </Box>
    </>
  );
}
