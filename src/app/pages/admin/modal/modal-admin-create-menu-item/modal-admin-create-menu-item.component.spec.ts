import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateMenuItemComponent } from './modal-admin-create-menu-item.component';

describe('ModalAdminCreateMenuItemComponent', () => {
  let component: ModalAdminCreateMenuItemComponent;
  let fixture: ComponentFixture<ModalAdminCreateMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminCreateMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminCreateMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
