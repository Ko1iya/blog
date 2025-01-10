// src/store/reducers/ActionCreater.ts

// const fetchId = () => async (dispatch: AppDispatch) => {
//   dispatch(searchIdFetching());

//   try {
//     const response = await fetch(
//       'https://aviasales-test-api.kata.academy/search',
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const { searchId } = await response.json();
//     dispatch(searchIdFetchingSuccess(searchId));
//   } catch (err) {
//     dispatch(searchIdFetchingError(err.message));
//   }
// };

// export { fetchId };
