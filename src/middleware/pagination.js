const decidePagination = (data, page, perPage) => {
  if (data.length > 0) {
    const totalLength = data.length;
    const numberOfPages = Math.ceil(totalLength / Number(perPage));
    const currentPage = Number(page);

    const countTillCurrentPage = currentPage * perPage;

    let hasNextPage;
    if (totalLength > countTillCurrentPage) {
      hasNextPage = true;
    } else {
      hasNextPage = false;
    }

    const dataStartIndex = currentPage === 1 ? 0 : (currentPage - 1) * perPage;

    const dataEndIndex =
      hasNextPage === false ? totalLength + 1 : currentPage * perPage;

    const newDataObject = {
      totalItems: totalLength,
      numberOfPages,
      currentPage: Number(currentPage),
      perPage: Number(perPage),
      countTillCurrentPage,
      hasNextPage: totalLength > countTillCurrentPage ? true : false,
      hasPreviousPage:
        currentPage === 1
          ? false
          : currentPage === numberOfPages
          ? true
          : totalLength < countTillCurrentPage
          ? false
          : true,
      data: data.slice(dataStartIndex, dataEndIndex),
      dataStartIndex,
      dataEndIndex,
    };

    return newDataObject;
  }
};

module.exports = decidePagination;
