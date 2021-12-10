#ifndef menudialog_H
#define menudialog_H

#include <QDialog>

#include <QJsonArray>

#include "mainwindow.h"


namespace Ui {
    class menudialog;
}

class menudialog: public QDialog {
    Q_OBJECT

    public:
        explicit menudialog(QWidget * parent,
            const QString user,
                const QJsonArray & code,
                    const QJsonArray & activity,
                        const QJsonArray & entry,
                            const QJsonArray & accept,
                                const QJsonValue & froze,
                                    const QString & date
        );

    ~menudialog();

    signals:
    void updateMain();

    private slots:

        void on_pushButtonProject_clicked();
    void refresh();
    void on_pushButtonReport_clicked();

    void on_pushButtonBack_clicked();

    void on_pushButtonSubmit_clicked();

    private:
        Ui::menudialog * ui;
    QString username;
    QJsonArray codeArr;
    QJsonArray activityArr;
    QJsonArray entryArr;
    QJsonValue frozen;
    QJsonArray acceptArr;
    QString myDate;
    QString reportDate;
};

#endif // menudialog_H
