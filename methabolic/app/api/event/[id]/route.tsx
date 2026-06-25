// import { getSheetData } from '../../components/sheets';
import { NextResponse, NextRequest } from 'next/server';



import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = 'events'; // ← Change to your actual tab name

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function getWorksheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[SHEET_NAME];
  if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" not found`);
  return sheet;
}



// ======================
// DELETE ROW
// ======================
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sheet = await getWorksheet();
    const rows = await sheet.getRows();
    const {id} = await params;

    const rowIndex = rows.findIndex(r => r.get('id') === id);

    if (rowIndex === -1) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    const rowToDelete = rows[rowIndex];
    await rowToDelete.delete();   // ← This deletes the row

    return Response.json({ 
      success: true, 
      message: `Event ${id} deleted successfully` 
    });
  } catch (error: any) {
    console.error(error);
    return Response.json({ 
      error: 'Failed to delete event from Google Sheet' 
    }, { status: 500 });
  }
}