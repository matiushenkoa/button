import { ThemeProvider } from './theme/ThemeProvider';
import { DemoContent } from './components/DemoContent';
import './design-system/typography.scss';
import './theme/theme.scss';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <DemoContent />
    </ThemeProvider>
  );
}

export default App;
