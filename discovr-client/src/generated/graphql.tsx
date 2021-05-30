import gql from 'graphql-tag';
import * as Urql from 'urql';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<User>;
    tracks: PaginatedTracks;
    getTracksByName: SearchTracks;
    trackByIdAndSameArtistTracks: IdAndArtistTracks;
    track: Track;
};

export type QueryTracksArgs = {
    cursor?: Maybe<Scalars['String']>;
    limit: Scalars['Int'];
};

export type QueryGetTracksByNameArgs = {
    name: Scalars['String'];
};

export type QueryTrackByIdAndSameArtistTracksArgs = {
    id: Scalars['Int'];
};

export type QueryTrackArgs = {
    id: Scalars['Int'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['Float'];
    username: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
    createdAt: Scalars['String'];
    updatedAt: Scalars['String'];
};

export type PaginatedTracks = {
    __typename?: 'PaginatedTracks';
    tracks: Array<Track>;
    hasMore: Scalars['Boolean'];
};

export type Track = {
    __typename?: 'Track';
    id: Scalars['Float'];
    name: Scalars['String'];
    url: Scalars['String'];
    votes: Scalars['Float'];
    voteStatus?: Maybe<Scalars['Int']>;
    creatorId: Scalars['Float'];
    creator: User;
    createdAt: Scalars['String'];
    updatedAt: Scalars['String'];
};

export type SearchTracks = {
    __typename?: 'SearchTracks';
    tracks: Array<Track>;
};

export type IdAndArtistTracks = {
    __typename?: 'IdAndArtistTracks';
    track: Track;
    tracks: Array<Track>;
};

export type Mutation = {
    __typename?: 'Mutation';
    changePassword: UserResponse;
    forgotPassword: Scalars['Boolean'];
    register: UserResponse;
    login: UserResponse;
    logout: Scalars['Boolean'];
    vote: Scalars['Boolean'];
    createTrack: Track;
    updateTrack?: Maybe<Track>;
    deleteTrack: Scalars['Boolean'];
};

export type MutationChangePasswordArgs = {
    newPassword: Scalars['String'];
    token: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};

export type MutationRegisterArgs = {
    options: UsernameEmailPasswordInput;
};

export type MutationLoginArgs = {
    password: Scalars['String'];
    usernameOrEmail: Scalars['String'];
};

export type MutationVoteArgs = {
    value: Scalars['Int'];
    trackId: Scalars['Int'];
};

export type MutationCreateTrackArgs = {
    input: TrackInput;
};

export type MutationUpdateTrackArgs = {
    url: Scalars['String'];
    name: Scalars['String'];
    id: Scalars['Int'];
};

export type MutationDeleteTrackArgs = {
    id: Scalars['Int'];
};

export type UserResponse = {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String'];
    message: Scalars['String'];
};

export type UsernameEmailPasswordInput = {
    username: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
    confirm: Scalars['String'];
};

export type TrackInput = {
    name: Scalars['String'];
    url: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>;

export type RegularUserFragment = { __typename?: 'User' } & Pick<User, 'id' | 'username'>;

export type RegularUserResponseFragment = { __typename?: 'UserResponse' } & {
    errors?: Maybe<Array<{ __typename?: 'FieldError' } & RegularErrorFragment>>;
    user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type TrackSnippetFragment = { __typename?: 'Track' } & Pick<
    Track,
    'id' | 'name' | 'url' | 'votes' | 'creatorId' | 'createdAt' | 'updatedAt' | 'voteStatus'
> & { creator: { __typename?: 'User' } & Pick<User, 'username' | 'id' | 'email' | 'createdAt'> };

export type ChangePasswordMutationVariables = Exact<{
    token: Scalars['String'];
    newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
    changePassword: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type CreateTrackMutationVariables = Exact<{
    input: TrackInput;
}>;

export type CreateTrackMutation = { __typename?: 'Mutation' } & {
    createTrack: { __typename?: 'Track' } & Pick<
        Track,
        'id' | 'name' | 'url' | 'votes' | 'creatorId' | 'createdAt' | 'updatedAt'
    >;
};

export type DeleteTrackMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteTrackMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTrack'>;

export type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'forgotPassword'>;

export type LoginMutationVariables = Exact<{
    usernameOrEmail: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type RegisterMutationVariables = Exact<{
    options: UsernameEmailPasswordInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type UpdateTrackMutationVariables = Exact<{
    id: Scalars['Int'];
    name: Scalars['String'];
    url: Scalars['String'];
}>;

export type UpdateTrackMutation = { __typename?: 'Mutation' } & {
    updateTrack?: Maybe<{ __typename?: 'Track' } & Pick<Track, 'id' | 'name' | 'url'>>;
};

export type VoteMutationVariables = Exact<{
    value: Scalars['Int'];
    trackId: Scalars['Int'];
}>;

export type VoteMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'vote'>;

export type GetTracksByNameQueryVariables = Exact<{
    name: Scalars['String'];
}>;

export type GetTracksByNameQuery = { __typename?: 'Query' } & {
    getTracksByName: { __typename?: 'SearchTracks' } & {
        tracks: Array<{ __typename?: 'Track' } & TrackSnippetFragment>;
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & { me?: Maybe<{ __typename?: 'User' } & RegularUserFragment> };

export type TrackQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type TrackQuery = { __typename?: 'Query' } & {
    track: { __typename?: 'Track' } & Pick<
        Track,
        'id' | 'name' | 'url' | 'votes' | 'creatorId' | 'createdAt' | 'updatedAt' | 'voteStatus'
    > & { creator: { __typename?: 'User' } & Pick<User, 'username' | 'id' | 'email' | 'createdAt'> };
};

export type TrackByIdAndSameArtistTracksQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type TrackByIdAndSameArtistTracksQuery = { __typename?: 'Query' } & {
    trackByIdAndSameArtistTracks: { __typename?: 'IdAndArtistTracks' } & {
        track: { __typename?: 'Track' } & TrackSnippetFragment;
        tracks: Array<{ __typename?: 'Track' } & TrackSnippetFragment>;
    };
};

export type TracksQueryVariables = Exact<{
    limit: Scalars['Int'];
    cursor?: Maybe<Scalars['String']>;
}>;

export type TracksQuery = { __typename?: 'Query' } & {
    tracks: { __typename?: 'PaginatedTracks' } & Pick<PaginatedTracks, 'hasMore'> & {
            tracks: Array<{ __typename?: 'Track' } & TrackSnippetFragment>;
        };
};

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
        field
        message
    }
`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        username
    }
`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
        errors {
            ...RegularError
        }
        user {
            ...RegularUser
        }
    }
    ${RegularErrorFragmentDoc}
    ${RegularUserFragmentDoc}
`;
export const TrackSnippetFragmentDoc = gql`
    fragment TrackSnippet on Track {
        id
        name
        url
        votes
        creatorId
        createdAt
        updatedAt
        voteStatus
        creator {
            username
            id
            email
            createdAt
        }
    }
`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
        changePassword(token: $token, newPassword: $newPassword) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
    return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
}
export const CreateTrackDocument = gql`
    mutation CreateTrack($input: TrackInput!) {
        createTrack(input: $input) {
            id
            name
            url
            votes
            creatorId
            createdAt
            updatedAt
        }
    }
`;

export function useCreateTrackMutation() {
    return Urql.useMutation<CreateTrackMutation, CreateTrackMutationVariables>(CreateTrackDocument);
}
export const DeleteTrackDocument = gql`
    mutation DeleteTrack($id: Int!) {
        deleteTrack(id: $id)
    }
`;

export function useDeleteTrackMutation() {
    return Urql.useMutation<DeleteTrackMutation, DeleteTrackMutationVariables>(DeleteTrackDocument);
}
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;

export function useForgotPasswordMutation() {
    return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
}
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
    return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;

export function useLogoutMutation() {
    return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const RegisterDocument = gql`
    mutation Register($options: UsernameEmailPasswordInput!) {
        register(options: $options) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
    return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}
export const UpdateTrackDocument = gql`
    mutation UpdateTrack($id: Int!, $name: String!, $url: String!) {
        updateTrack(id: $id, name: $name, url: $url) {
            id
            name
            url
        }
    }
`;

export function useUpdateTrackMutation() {
    return Urql.useMutation<UpdateTrackMutation, UpdateTrackMutationVariables>(UpdateTrackDocument);
}
export const VoteDocument = gql`
    mutation Vote($value: Int!, $trackId: Int!) {
        vote(value: $value, trackId: $trackId)
    }
`;

export function useVoteMutation() {
    return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
}
export const GetTracksByNameDocument = gql`
    query GetTracksByName($name: String!) {
        getTracksByName(name: $name) {
            tracks {
                ...TrackSnippet
            }
        }
    }
    ${TrackSnippetFragmentDoc}
`;

export function useGetTracksByNameQuery(options: Omit<Urql.UseQueryArgs<GetTracksByNameQueryVariables>, 'query'> = {}) {
    return Urql.useQuery<GetTracksByNameQuery>({ query: GetTracksByNameDocument, ...options });
}
export const MeDocument = gql`
    query Me {
        me {
            ...RegularUser
        }
    }
    ${RegularUserFragmentDoc}
`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
    return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const TrackDocument = gql`
    query Track($id: Int!) {
        track(id: $id) {
            id
            name
            url
            votes
            creatorId
            createdAt
            updatedAt
            voteStatus
            creator {
                username
                id
                email
                createdAt
            }
        }
    }
`;

export function useTrackQuery(options: Omit<Urql.UseQueryArgs<TrackQueryVariables>, 'query'> = {}) {
    return Urql.useQuery<TrackQuery>({ query: TrackDocument, ...options });
}
export const TrackByIdAndSameArtistTracksDocument = gql`
    query TrackByIdAndSameArtistTracks($id: Int!) {
        trackByIdAndSameArtistTracks(id: $id) {
            track {
                ...TrackSnippet
            }
            tracks {
                ...TrackSnippet
            }
        }
    }
    ${TrackSnippetFragmentDoc}
`;

export function useTrackByIdAndSameArtistTracksQuery(
    options: Omit<Urql.UseQueryArgs<TrackByIdAndSameArtistTracksQueryVariables>, 'query'> = {},
) {
    return Urql.useQuery<TrackByIdAndSameArtistTracksQuery>({
        query: TrackByIdAndSameArtistTracksDocument,
        ...options,
    });
}
export const TracksDocument = gql`
    query Tracks($limit: Int!, $cursor: String) {
        tracks(limit: $limit, cursor: $cursor) {
            hasMore
            tracks {
                ...TrackSnippet
            }
        }
    }
    ${TrackSnippetFragmentDoc}
`;

export function useTracksQuery(options: Omit<Urql.UseQueryArgs<TracksQueryVariables>, 'query'> = {}) {
    return Urql.useQuery<TracksQuery>({ query: TracksDocument, ...options });
}
