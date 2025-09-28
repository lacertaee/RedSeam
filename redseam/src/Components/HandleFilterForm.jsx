export function handleFilterForm(e, setRange, setShowFilter, setShow) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fromPrice = Number(formData.get("from"));
  const toPrice = Number(formData.get("to"));

  setShow(true);
  setShowFilter(false);
  setRange({
    from: fromPrice,
    to: toPrice,
  });
}
