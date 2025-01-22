import { FC, ReactNode } from 'react';

interface LoginFormContainerProps {
  children: ReactNode;
}

export const LoginFormContainer: FC<LoginFormContainerProps> = ({
  children,
}) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  );
};
