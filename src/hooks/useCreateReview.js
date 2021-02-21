import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const ratingNumber = Number(rating);
    const response = await mutate({ variables: { ownerName, repositoryName, rating: ratingNumber, text }});

    if (response && response.data) {
      return response.data.createReview.repositoryId;
    }

    return response;
  };

  return [createReview, result];
};

export default useCreateReview;