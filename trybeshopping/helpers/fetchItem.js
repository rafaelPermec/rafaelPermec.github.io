const fetchItem = async (ItemID) => {
  const url = `https://api.mercadolibre.com/items/${ItemID}`; 
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
