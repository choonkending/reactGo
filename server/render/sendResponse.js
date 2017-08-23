const sendResponse = response => html => {
  return response.status(200).send(html);
};

export default sendResponse;

