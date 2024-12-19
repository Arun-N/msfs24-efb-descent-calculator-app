import {
  GamepadUiView,
  RequiredProps,
  TTButton,
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
        class="sample-page"
        style={`--color: ${this.props.color}`}
      >
        <div class="header">
          <TTButton
            key="Go back"
            type="secondary"
            callback={(): void => {
              this.props.appViewService.goBack();
            }}
          />
          <h2>{this.props.title}</h2>
        </div>

        <div class="content">
          <TTButton
            key="Open page 1"
            callback={(): void => {
              console.log("MainPage");
              // this.props.appViewService.open("MainPage");
            }}
          />
        </div>
      </div>
    );
  }
}
