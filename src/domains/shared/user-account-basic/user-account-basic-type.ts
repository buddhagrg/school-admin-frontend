export type UserAccountBasicDataProps = {
    users: UserAccountBasicProps[];
    isLoading: boolean;
    isError: boolean;
    error?: string;
};

export type UserAccountBasicProps = {
    id: number;
    name: string;
    email: string;
    role: string;
    systemAccess: boolean;
    lastLogin: Date | null;
};
