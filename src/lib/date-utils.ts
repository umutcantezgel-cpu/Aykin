export const formatOrderDate = (isoString: string | undefined | null) => {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (e) {
    return '';
  }
};

export const getPickupDateDisplay = (dateString: string | undefined | null) => {
  if (!dateString) return '';
  try {
    const isToday = dateString === new Date().toISOString().split('T')[0];
    if (isToday) return "Heute";
    return new Date(dateString).toLocaleDateString("de-DE", { weekday: 'short', day: '2-digit', month: '2-digit' });
  } catch (e) {
    return '';
  }
};
