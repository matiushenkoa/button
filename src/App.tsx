import { ThemeProvider } from './design-system/theme/ThemeProvider';
import { DemoContent } from './components/DemoContent';
import './design-system/theme/typography.scss';
import './design-system/theme/theme.scss';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <DemoContent />
    </ThemeProvider>
  );
}

export default App;
