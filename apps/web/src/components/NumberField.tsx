/**
 * Campo numerico reutilizable (etiqueta + input).
 *
 * Recibe sus datos por PROPS: el componente padre le dice que etiqueta
 * mostrar, que valor tiene y que hacer cuando cambia. Asi escribimos el
 * input UNA vez y lo reusamos en todas las calculadoras.
 */

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // el "?" significa que es opcional
}

export function NumberField({ label, value, onChange, placeholder }: NumberFieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
