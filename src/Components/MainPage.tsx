import {
  GamepadUiView,
  RequiredProps,
  TVNode,
  UiViewProps,
} from "@efb/efb-api";
import { FSComponent } from "@microsoft/msfs-sdk";
import "./MainPage.scss";

interface MainPageProps extends RequiredProps<UiViewProps, "appViewService"> {
  /** The page title */
  title: string;

  /** The page background color */
  color: string;
}

export class MainPage extends GamepadUiView<HTMLDivElement, MainPageProps> {
  public readonly tabName = MainPage.name;

  public render(): TVNode<HTMLDivElement> {
    return (
      <div
        ref={this.gamepadUiViewRef}
        class="main-page-container"
        style={`--color: ${this.props.color}`}
      >
        <div class="header">
          <h2>Descent Calculator</h2>
          <p>
            Get an approximate Top of Descent (TOD) value by inputting your
            altitude, speed and wind data.
          </p>
        </div>

        <div class="content">
          <div class={"descent-calc-form"}>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
            <p>Item 4</p>
            <p>Item 5</p>
            <p>Item 6</p>
          </div>
          {/* <TTButton
            key="Open page 1"
            callback={(): void => {
              console.log("MainPage");
            }}
          /> */}
        </div>
      </div>
    );
  }
}
