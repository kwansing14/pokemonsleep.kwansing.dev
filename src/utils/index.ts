export const updateLocalStorage = <T>(newState: T) => {
  const checkLS = localStorage.getItem("pschecked");
  if (!checkLS) {
    localStorage.setItem("pschecked", JSON.stringify(newState));
  } else {
    const res = JSON.parse(checkLS) as T;
    const newLS = { ...res, ...newState };
    localStorage.setItem("pschecked", JSON.stringify(newLS));
  }
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    throw new Error("Error copying to clipboard");
  }
};
