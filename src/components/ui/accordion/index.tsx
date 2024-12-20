import { useState } from "preact/hooks";
import "./index.scss";

export function Accordion({
  title = "",
  children,
  show = false,
}: {
  title?: any;
  children: any;
  show?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(show || !title);

  return (
    <div className="base-accordion">
      {title ? (
        <div
          className="base-accordion__header"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h1>{title}</h1>

          <div className="icon" data-isOpen={isOpen}>
            {/* prettier-ignore */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4698 7.71934C11.6105 7.57889 11.8011 7.5 11.9998 7.5C12.1986 7.5 12.3892 7.57889 12.5298 7.71934L20.0298 15.2193C20.1035 15.288 20.1626 15.3708 20.2036 15.4628C20.2446 15.5548 20.2667 15.6541 20.2684 15.7548C20.2702 15.8555 20.2517 15.9555 20.214 16.0489C20.1762 16.1423 20.1201 16.2272 20.0489 16.2984C19.9777 16.3696 19.8928 16.4257 19.7994 16.4635C19.7061 16.5012 19.606 16.5197 19.5053 16.5179C19.4046 16.5162 19.3053 16.4941 19.2133 16.4531C19.1213 16.4121 19.0385 16.353 18.9698 16.2793L11.9998 9.30934L5.02985 16.2793C4.88767 16.4118 4.69963 16.4839 4.50532 16.4805C4.31102 16.4771 4.12564 16.3984 3.98822 16.261C3.85081 16.1235 3.7721 15.9382 3.76867 15.7439C3.76524 15.5496 3.83737 15.3615 3.96985 15.2193L11.4698 7.71934Z" fill="black"/>
            </svg>
          </div>
        </div>
      ) : null}

      {isOpen && <div className="base-accordion__content">{children}</div>}
    </div>
  );
}

export function AccordionItem({ title, value = "" }: { title: any, value?: any }) {
  return (
    <div className="base-accordion__item">
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
}

export function AccordionItemTitle({ children }) {
  return (
    <div className="base-accordion__item base-accordion__item-title">
      <div>{children}</div>
      <div></div>
    </div>
  );
}


export function AccordionGap() {
  return (
    <div className="base-accordion__item base-accordion__gap">
      <div></div>
      <div></div>
    </div>
  )
}