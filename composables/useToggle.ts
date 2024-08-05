export default function useToggle() {
  const visible = ref(false);

  const onToggle = () => (visible.value = !visible.value);

  return {
    visible: readonly(visible),
    onToggle,
  };
}
