#include "mainwindow.h"

#include "reportdialog.h"

#include "ui_reportdialog.h"

reportdialog::reportdialog(QWidget * parent,
        const QString & user):
    QDialog(parent),
    ui(new Ui::reportdialog) {
        ui -> setupUi(this);
        username = user;
        setWindowTitle("View Report");
        setWindowFlags(Qt::Window | Qt::WindowTitleHint | Qt::CustomizeWindowHint | Qt::MSWindowsFixedSizeDialogHint | Qt::WindowStaysOnTopHint);
        loadMonthBox();

    }

reportdialog::~reportdialog() {
    delete ui;
}

void reportdialog::loadTable(QString & string) {

    QJsonModel * model = new QJsonModel;

    ui -> treeView -> setModel(model);
    model -> loadJson(string.toUtf8());
    ui -> treeView -> setColumnWidth(0, 400);
    ui -> treeView -> show();

}

void reportdialog::loadMonthData() {

    reportDate = ui -> comboMonth -> currentText();
    QFile file("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + username + "/" + username + "-" + reportDate + ".json");
    if (!file.exists()) {
        QMessageBox::warning(this, "Error", "No reports at the given month");
        return;
    } else if (file.open(QFile::ReadOnly | QFile::Text)) {
        QString stringData = file.readAll();
        file.close();

        QJsonDocument document = QJsonDocument::fromJson(stringData.toUtf8());
        QJsonObject data = document.object();

        frozen = data["frozen "].toString();
        entryArr = data["entries "].toArray();
        acceptArr = data["accepted "].toArray();
        loadTable(stringData);
        loadMonthBox();

    } else {
        QMessageBox::warning(this, "Error", "Cannot open file");
        return;
    }

}

void reportdialog::on_pushButtonExit_clicked() {
    rejected();
    close();
}

void reportdialog::loadMonthBox() {

    QString curr;
    ui -> comboMonth -> clear();

    QDir directory("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + username);
    QStringList reports = directory.entryList(QStringList() << "*.json", QDir::Files);
    foreach(QString filename, reports) {
        QString subString = filename.right(12);
        subString.chop(5);
        ui -> comboMonth -> addItem(subString);

    }
    ui -> comboMonth -> model() -> sort(0);

}

void reportdialog::on_pushButton_clicked() {
    loadMonthData();
}

void reportdialog::on_pushButtonSubmit_clicked() {
    if (ui -> comboMonth -> count() == 0)
        return;

    else if (frozen == "True ") {
        QMessageBox::warning(this, "Error", "This report already submitted");
        close();
    } else
        QMessageBox::warning(this, "Warning", "Are you sure you want to submit this report. You won't be able to make changes once you submit a report");
    QMessageBox confirm(this);
    confirm.setWindowTitle("Confirm");
    confirm.setText("Are you sure you want to submit this report. You won't be able to make changes once you submit a report");
    confirm.setStandardButtons(QMessageBox::Yes);
    confirm.addButton(QMessageBox::No);
    confirm.setDefaultButton(QMessageBox::No);

    QFile file("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + username + "/" + username + "-" + reportDate + ".json");
    file.open(QIODevice::ReadOnly | QIODevice::Text);

    QString stringData = file.readAll();
    file.close();

    QJsonDocument document = QJsonDocument::fromJson(stringData.toUtf8());
    QJsonObject data = document.object();

    QJsonObject & m_addvalue = data;
    m_addvalue["frozen "] = "True ";
    data = m_addvalue;
    document.setObject(data);
    file.open(QFile::WriteOnly | QFile::Text | QFile::Truncate);
    file.write(document.toJson());
    file.close();
    loadMonthData();
    accepted();

}
