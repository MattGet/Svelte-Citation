import type { State } from '@vincjo/datatables/remote';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk } from '@clerk/backend';

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });

export const reload = async (state: State) => {
    const response = await clerk.users.getUserList();
    return JSON.stringify(response);
};

const getParams = (state: State) => {
    const { pageNumber, rowsPerPage, sort, filters, search } = state;

    let params = `_page=${pageNumber}`;

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`;
    }
    if (sort) {
        params += `&_sort=${sort.orderBy}&_order=${sort.direction}`;
    }

    if (filters) {
        params += filters.map(({ filterBy, value }) => `&${filterBy}=${value}`).join();
    }
    // console.log(params);
    if (search) {
        params += `&q=${search}`;
    }
    return params;
};