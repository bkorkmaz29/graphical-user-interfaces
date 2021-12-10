#include "logindialog.h"

#include "ui_logindialog.h"

#include <QMessageBox>

logindialog::logindialog(QWidget * parent):
    QDialog(parent),
    ui(new Ui::logindialog) {
        ui -> setupUi(this);
        setWindowTitle("Login");
    }

logindialog::~logindialog() {
    delete ui;
}

void logindialog::on_pushButton_clicked() {
    QString str = ui -> lineEditUser -> text();

    username = str.simplified();
    if (str.isEmpty()) {
        QMessageBox::warning(this, "Login", "Please enter a username");
        reject();
    } else {
        accept();
    }

}

const QString & logindialog::getUsername() const {
    return username;
}

void logindialog::setUsername(const QString & newUsername) {
    username = newUsername;
}

void logindialog::on_pushButton_2_clicked() {
    close();
}
