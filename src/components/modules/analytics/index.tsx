import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import "./index.scss";
import useRequest from "../../../hooks/use-request";
import { getAnalytics } from "../../../assets/api/overview";

import useTabs from "../../../hooks/use-tabs";
import Tabs from "../../ui/tabs";

import { useEffect, useRef, useState } from "preact/hooks";
import { Dropdown, DropdownContent, DropdownTrigger } from "../../ui/dropdown";

Chart.register(...registerables);

export default function Analytics({}: any) {
  const { response } = useRequest(getAnalytics, {}, true);
  const { tabs } = useTabs(["Month", "Year"]);

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Approved",
            data: [0.2, 0.7, 1.2, 1.8, 2.3, 3, 4, 3.8, 3.2, 2.3, 1.2, 0.7], // Replace with your actual data
            borderColor: "green",
            backgroundColor: "green",
            fill: false,
            tension: 0.4, // Adds slight curve to the line
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Hours",
            },
          },
        },
      },
    });
  });

  const [year, setYear] = useState("2024");
  const yearOptions = [
    {
      value: "2024",
      text: "2024",
    },
    {
      value: "2023",
      text: "2023",
    },
    {
      value: "2022",
      text: "2022",
    },
  ];

  return (
    <div>
      <Header title="Analytics & Report" />

      <div className="app-section">
        <div className="app-analytics__header">
          <Button
            dimension="md"
            variant="primary"
            onClick={() => generateReport(response)}
          >
            <Icon name="report" />
            Generate Report
          </Button>

          <div>
            <Tabs {...{ tabs }} />
            <Dropdown>
              <DropdownTrigger>{year}</DropdownTrigger>
              <DropdownContent>
                {yearOptions.map((year) => (
                  <div
                    className={"base-dropdown__option"}
                    onClick={() => setYear(year.value)}
                    key={year.value}
                  >
                    {year.text}
                  </div>
                ))}
              </DropdownContent>
            </Dropdown>
            {/* <DateFilter variant="secondary" /> */}
          </div>
        </div>

        <div className="app-analytics__grid">
          <div className="app-analytics__card">
            <p className="app-analytics__card__title">Total Permits</p>

            <div className="stats">
              <h4>{response?.data?.allPermitCount ?? 0}</h4>
              <p className="stat-increase">
                + 16.5% <Icon name="increase" />
              </p>
            </div>

            <div className="counts">
              <div>
                <h4>{response?.data?.closedPermitCount ?? 0}</h4>
                <p>Closed</p>
              </div>

              <div>
                <h4>{response?.data?.issuedPermitCount ?? 0}</h4>
                <p>Issued</p>
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-bar__bar">
                <div className="approved-bar"></div>
                <div className="rejected-bar"></div>
              </div>
              <div>
                <p>70%</p>
                <p>30%</p>
              </div>
            </div>
          </div>

          <div className="app-analytics__bar-chart">
            <div className="app-analytics__bar-chart__header">
              <h4>Permits</h4>

              <div className="app-indicator">
                <p>
                  <span style={{ background: "#008d4e" }}></span>
                  Issued
                </p>

                <p>
                  <span style={{ background: "#E86E18" }}></span>
                  Closed
                </p>
              </div>
            </div>

            <div style={{ height: "250px" }}>
              <Bar
                options={
                  {
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        border: { display: false },
                        grid: { color: "#dbdbdb80", lineWidth: 1 },
                        ticks: {
                          callback: function (val, index) {
                            return index % 2 === 0
                              ? this.getLabelForValue(val)
                              : "";
                          },
                        },
                      },
                      x: {
                        grid: { border: { display: false }, lineWidth: 0 },
                        ticks: { zIndex: 10, beginAtZero: true },
                      },
                    },
                  } as any
                }
                data={
                  {
                    labels:
                      getApprovalsData(
                        response?.data?.permitChart?.closedPermitsGroupedByMonth
                      ).labels ?? [],
                    datasets: response
                      ? [
                          {
                            label: "Issued",
                            data:
                              getApprovalsData(
                                response?.data?.permitChart
                                  ?.issuedPermitsGroupedByMonth
                              ).data ?? [],
                            backgroundColor: "#008D4E",
                            borderRadius: 20,
                            barThickness: 12,
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 2,
                          },
                          {
                            label: "Closed",
                            data:
                              getApprovalsData(
                                response?.data?.permitChart
                                  ?.closedPermitsGroupedByMonth
                              ).data ?? [],
                            backgroundColor: "#E86E18",
                            borderRadius: 20,
                            barThickness: 12,
                            borderColor: "rgba(232, 110, 24, 1)",
                            borderWidth: 2,
                          },
                        ]
                      : [],
                  } as any
                }
              />
            </div>
          </div>
        </div>

        <div className="app-analytics__grid">
          <div className="app-analytics__approvals">
            <h2>Safety Metrics</h2>
            <canvas ref={chartRef} />
          </div>

          <div className="app-analytics__card app-analytics__line-graph">
            <h2 className="">Top Identified Hazards</h2>

            <div className="">
              <div className="details">
                <h4>Noise</h4>
                <span>500 permits</span>
              </div>

              <div className="details">
                <h4>Toxic Substance</h4>
                <span>500 permits</span>
              </div>

              <div className="">
                <h4>Spill (CONTAINMENT IN PLACE)</h4>
                <span>500 permits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getApprovalsData(data) {
  if (!data) return {};
  return {
    labels: Object.keys(data),
    data: Object.values(data),
  };
}

function generateReport(data) {
  console.log("oga please");
  if (!data.success || data.statusCode !== 201) {
    return "Failed to retrieve data for the report.";
  }

  const {
    allPermitCount,
    closedPermitCount,
    issuedPermitCount,
    permitChart: { closedPermitsGroupedByMonth, issuedPermitsGroupedByMonth },
  } = data.data;

  // Get the current year and month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const currentMonthYear = `${currentYear}-${currentMonth}`;

  let report = `### Monthly Permit Report for ${now.toLocaleString("default", {
    month: "long",
  })} ${currentYear}\n\n`;

  report += `#### Summary:\n`;
  report += `- Total Permits: ${allPermitCount}\n`;
  report += `- Issued Permits: ${issuedPermitCount}\n`;
  report += `- Closed Permits: ${closedPermitCount}\n\n`;

  report += `---\n\n#### **Details of Issued Permits (December 2024):**\n`;
  if (issuedPermitsGroupedByMonth["2024-12"]) {
    issuedPermitsGroupedByMonth["2024-12"].forEach((permit, index) => {
      report += `${index + 1}. **Permit ID:** ${permit.publicId}\n`;
      report += `   - **Type:** ${permit.type}\n`;
      report += `   - **Work Area:** ${permit.workArea}\n`;
      report += `   - **Performing Person in Charge:** ${permit.performingPersonInCharge}\n`;
      report += `   - **Description:** ${permit.workDescription}\n`;
      report += `   - **From Date:** ${permit.fromDate}\n`;
      report += `   - **To Date:** ${permit.toDate}\n`;
      report += `   - **Status:** ${permit.status}\n`;
      report += `   - **Date Approved:** ${new Date(
        permit.dateApproved
      ).toLocaleDateString()}\n`;
      report += `   - **Current Authority:** ${permit.currentAuthority}\n\n`;
    });
  } else {
    report += "_No issued permits for this period._\n\n";
  }

  report += `---\n\n#### **Details of Closed Permits (December 2024):**\n`;
  if (closedPermitsGroupedByMonth["2024-12"]) {
    closedPermitsGroupedByMonth["2024-12"].forEach((permit, index) => {
      report += `${index + 1}. **Permit ID:** ${permit.publicId}\n`;
      report += `   - **Type:** ${permit.type}\n`;
      report += `   - **Work Area:** ${permit.workArea}\n`;
      report += `   - **Performing Person in Charge:** ${permit.performingPersonInCharge}\n`;
      report += `   - **Description:** ${permit.workDescription}\n`;
      report += `   - **From Date:** ${permit.fromDate}\n`;
      report += `   - **To Date:** ${permit.toDate}\n`;
      report += `   - **Status:** ${permit.status}\n`;
      report += `   - **Date Closed:** ${
        permit.dateClosed
          ? new Date(permit.dateClosed).toLocaleDateString()
          : "N/A"
      }\n`;
      report += `   - **Current Authority:** ${permit.currentAuthority}\n\n`;
    });
  } else {
    report += "_No closed permits for this period._\n\n";
  }

  // Create a downloadable document
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Monthly_Permit_Report_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;

  // Append the link to the body (required for Firefox) and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
