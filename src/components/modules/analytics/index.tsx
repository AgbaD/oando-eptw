import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Button from "../../ui/button";
import DateFilter from "../../ui/date/date-filter";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import "./index.scss";
import useRequest from "../../../hooks/use-request";
import { getAnalytics } from "../../../assets/api/overview";

import { useEffect, useRef } from "preact/hooks";

Chart.register(...registerables);

export default function Analytics({}: any) {
  const { response } = useRequest(getAnalytics, {}, true);
  // const { activeTab, tabs } = useTabs(["Month", "Year"]);

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

  return (
    <div>
      <Header title="Analytics & Report" />

      <div className="app-section">
        <div className="app-analytics__header">
          <Button dimension="md" variant="primary">
            <Icon name="report" />
            Generate Report
          </Button>

          <div>
            {/* <Tabs {...{ tabs }} /> */}
            <DateFilter variant="secondary" />
          </div>
        </div>

        <div className="app-analytics__grid">
          <div className="app-analytics__card">
            <p className="app-analytics__card__title">Total Permits</p>

            <div className="stats">
              <h4>{response?.data?.permits?.totalPermitCount ?? 0}</h4>
              <p className="stat-increase">
                + 16.5% <Icon name="increase" />
              </p>
            </div>

            <div className="counts">
              <div>
                <h4>{response?.data?.permits?.totalApprovedCount ?? 0}</h4>
                <p>Approved</p>
              </div>

              <div>
                <h4>{response?.data?.permits?.totalRejectedCount ?? 0}</h4>
                <p>Rejected</p>
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
                  Approval
                </p>

                <p>
                  <span style={{ background: "#F1511B" }}></span>
                  Rejected
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
                        response?.data?.permitApprovalGraph
                          ?.groupedRejectedPermits
                      ).labels ?? [],
                    datasets: response
                      ? [
                          {
                            label: "Approved",
                            data:
                              getApprovalsData(
                                response?.data?.permitApprovalGraph
                                  ?.groupedApprovedPermits
                              ).data ?? [],
                            backgroundColor: "#008D4E",
                            borderRadius: 20,
                            barThickness: 12,
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 2,
                          },
                          {
                            label: "Rejected",
                            data:
                              getApprovalsData(
                                response?.data?.permitApprovalGraph
                                  ?.groupedRejectedPermits
                              ).data ?? [],
                            backgroundColor: "#F1511B",
                            borderRadius: 20,
                            barThickness: 12,
                            borderColor: "rgba(0,0,0,0)",
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

            <p>-------------------------------</p>
            <h2>Noise</h2>
            <span>500 permits</span>
            <p>-------------------------------</p>
            <h2>Toxic Substance</h2>
            <span>500 permits</span>
            <p>-------------------------------</p>
            <h2>Spill (CONTAINMENT IN PLACE)</h2>
            <span>500 permits</span>
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
