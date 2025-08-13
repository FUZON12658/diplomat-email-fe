import { ambclubAxios } from '..';

export const updateUserUsingAuthInQuery = async ({
  auth,
  updates,
}: {
  auth: string;
  updates: Record<string, unknown>;
}) => {
  const { data } = await ambclubAxios.put(`/api/v1/query/user`, updates, {
    params: { auth },
  });
  return data;
};

export const getMemberApi = async (id:string) => {
  const { data } = await ambclubAxios.get(`/api/v1/members/${id}`);
  return data;
};
