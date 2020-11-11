import React from "react";
import "./ErrorBoundary.scss";

interface ErrorBoundaryProps {
  onError?: (error: Error) => void;
  onRetry?: () => void;
}

interface ErrorBoundaryState {
  message: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  static getDerivedStateFromError(error: any) {
    return { message: error.message };
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (this.props.onError) {
      // log to server
      this.props.onError(error);
    }
  }

  handleRetry = () => {
    this.setState({ message: "" });
    if (this.props.onRetry) this.props!.onRetry();
  };

  render() {
    if (this.state.message) {
      return (
        <div className="error-message">
          <div>{this.state.message}</div>
          <button onClick={this.handleRetry}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
