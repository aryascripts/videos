import React from 'react';
import './App.css';
import { Body } from './components/Body';
import { ErrorBoundary } from './videos/ErrorBoundary/ErrorBoundary';
import { Header } from './components/Header';
import { TodoList } from './videos/TodoList/TodoList';
import { TodoStore } from './videos/TodoList/TodoStore';

function App() {
  return (<>
    <Header />
    <Body>
      <ErrorBoundary>
        <TodoList todoStore={TodoStore} />
      </ErrorBoundary>
    </Body>
  </>
  );
}

export default App;
