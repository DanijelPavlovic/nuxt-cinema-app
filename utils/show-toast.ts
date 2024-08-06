type ToastOptions = {
  title: string;
  description: string;
  color?: string | null;
};

export default function showToast(options: ToastOptions) {
  const toast = useToast();

  let data: ToastOptions = {
    title: options.title,
    description: options.description,
  };

  if (options.color) {
    data = {
      ...data,
      color: options.color,
    };
  }

  toast.add(data as Partial<Notification>);

  return;
}
