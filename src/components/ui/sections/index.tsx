import React, { Children } from "react";
import "./index.scss";

interface SectionProps {
  children: any;
  section: string;
  header: string;
  type: string;
}
export default function Section({
  children,
  header,
  section,
  type,
}: SectionProps) {
  const childrenArray = Children.map(children, (child) => {
    return (
      <div className="">
        {type === "Hazards" && (
          <>
            <div key={child.id} className="section__content">
              <p className="title">{child.title}</p>
              <p className="info">{child.info}</p>
            </div>

            <div key={child.id} className="section__content">
              <p className="title">{`${child.second_title}`}</p>

              <div>
                {" "}
                {child.content.map((item) => (
                  <div className="">
                    <span className={"hazard-value"}>{`${item.value}`}</span>
                    {" - "}
                    <span className="">{`${item.hazard}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {type === "Primary" && (
          <div key={child.id} className="section__content">
            <p className="title">{child.title}</p>
            <p className="info">{child.info}</p>
          </div>
        )}
        {type === "Secondary" && (
          <div key={child.id} className="">
            {child.content.map((item) => (
              <>
                <div className="section__content__document_section">
                  <p className="section__header">{`${item.id}. ${item.title}`}</p>
                </div>

                <div className="section__content">
                  <p className="document">
                    <span>Upload Option</span>
                  </p>
                  <p> {item.upload_option}</p>
                  <p className="document">
                    <span>Document</span>
                  </p>
                  <p className="document_item">
                    document.pdf
                    <span>
                      <img src="/svgs/document_download.svg" alt="" />
                    </span>
                  </p>
                </div>
              </>
            ))}
          </div>
        )}
        {type === "Permits" && (
          <div key={child.id} className="">
            {child.content.map((item) => (
              <>
                <div className="section__content">
                  <p className={"title"}> {item.title}</p>

                  <div className="flex-between">
                    <p>{item.upload_option}</p>

                    <p className="document_item">
                      document.pdf
                      <span>
                        <img src="/svgs/document_download.svg" alt="" />
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
        {type === "List" && (
          <div className="section__content">
            <div>
              {" "}
              {child.content.map((item) => (
                <div className="list-p">
                  <span>
                    {`${item.value}`} {" - "}
                  </span>

                  <span className={"hazard-value"}>{`${item.equipment}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <div className="section">
        <div className="section__header">
          <p>
            <span>Section - {section}</span>
            {header}
          </p>
        </div>
        <div>{childrenArray}</div>
      </div>
    </div>
  );
}
